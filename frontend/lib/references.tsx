import * as types from "../types"

/**
 * That's a lot of regex. There are two passes of regex a rule is ran through.
 * - The first pass finds every `(R|r)ule(s) complete-rule-id and complete-rule-id` where the second
 * complete-rule-id is caught.
 * - The second is the same but this time the first complete-rule-id is caught.
 *
 * @param rule
 * @returns rule with references to other rules tagged as html a-tag links
 */
function addLinks(rule: string): string {
  const ruleIdRegexAndVer = /(?<=.*[rR]ules? \d\d{2}(?:\.\d{1,3})?[a-z]? and )((\d)\d{2}(?:\.\d{1,3})?[a-z]?)(?=.*)/g
  const ruleIdRegex = /(?<=.*[rR]ules? )((\d)\d{2}(\.\d{1,3})?[a-z]?)(?=.*)/g
  let ruleWithLinks: string = rule.replace(ruleIdRegexAndVer, '<a href="/chapter/$2#$1">$1</a>')
  ruleWithLinks = ruleWithLinks.replace(ruleIdRegex, '<a href="/chapter/$2#$1">$1</a>')
  return ruleWithLinks
}

/**
 * Wraps addLinks function to a loop that goes through every rule and subrule.
 *
 * @param chapters
 * @returns chapterse with references to other rules tagged as html a-tag links
 */
export function addReferences(chapters: types.Chapter[]): types.Chapter[] {
  chapters.forEach((chapter: types.Chapter, chIndex) => {
    chapter.subchapters.forEach((subchapter: types.Subchapter, subChIndex) => {
      subchapter.rules.forEach((rule: types.Rule, ruleIndex) => {
        const ruleContent: string = chapters[chIndex].subchapters[subChIndex].rules[ruleIndex].content
        chapters[chIndex].subchapters[subChIndex].rules[ruleIndex].content = addLinks(ruleContent)
        rule.subrules.forEach((_, subruleIndex) => {
          const subruleContent: string =
            chapters[chIndex].subchapters[subChIndex].rules[ruleIndex].subrules[subruleIndex].content
          chapters[chIndex].subchapters[subChIndex].rules[ruleIndex].subrules[subruleIndex].content =
            addLinks(subruleContent)
        })
      })
    })
  })

  return chapters
}
