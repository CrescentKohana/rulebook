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
  const ruleIdRegexAndVer =
    /(?<=.*(?:[rR]ules?|in) \d\d{2}(?:\.\d{1,3})?[a-z]? and )((\d)\d{2}(?:\.\d{1,3})?[a-z]?)(?=.*)/g
  const ruleIdRegex = /(?<=.*(?:[rR]ules?|in) )((\d)\d{2}(\.\d{1,3})?[a-z]?)(?=.*)/g
  let ruleWithLinks: string = rule.replace(ruleIdRegexAndVer, '<a id="ref-$1" href="/chapter/$2#$1">$1</a>')
  ruleWithLinks = ruleWithLinks.replace(ruleIdRegex, '<a id="ref-$1" href="/chapter/$2#$1">$1</a>')
  return ruleWithLinks
}

/**
 * Wraps addLinks function to a loop that goes through every rule and subrule in a chapter.
 *
 * @param a chapter
 * @returns a chapter with references to other rules tagged as html a-tag links
 */
export function addReferences(chapter: types.Chapter): types.Chapter {
  chapter.subchapters.forEach((subchapter: types.Subchapter, subChIndex) => {
    subchapter.rules.forEach((rule: types.Rule, ruleIndex) => {
      const ruleContent: string = chapter.subchapters[subChIndex].rules[ruleIndex].content
      chapter.subchapters[subChIndex].rules[ruleIndex].content = addLinks(ruleContent)
      rule.subrules.forEach((_, subruleIndex) => {
        const subruleContent: string = chapter.subchapters[subChIndex].rules[ruleIndex].subrules[subruleIndex].content
        chapter.subchapters[subChIndex].rules[ruleIndex].subrules[subruleIndex].content = addLinks(subruleContent)
      })
    })
  })

  return chapter
}
