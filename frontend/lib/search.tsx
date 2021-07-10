import * as types from "../types"

export interface SearchResults {
  data: types.SearchResult[]
  total: number
  shown: number
}

export function search(chapters: types.Chapter[], searchTerm: string): SearchResults | null {
  if (searchTerm.length < 3) {
    return null
  }

  const results: types.SearchResult[] = []

  // Search with direct ID
  const exactResult: types.SearchResult | null = findExactId(searchTerm, chapters)
  if (exactResult) {
    results.push(exactResult)
  }

  // Deep search
  chapters.forEach((chapter: types.Chapter) => {
    if (compare(chapter.title, searchTerm)) {
      results.push({
        chapterId: chapter.id,
        comboId: "",
        snippet: chapter.title,
      })
    }

    chapter.subchapters.forEach((subchapter: types.Subchapter) => {
      if (compare(subchapter.title, searchTerm)) {
        results.push({
          chapterId: chapter.id,
          comboId: `${subchapter.id}`,
          snippet: subchapter.title,
        })
      }

      subchapter.rules.forEach((rule: types.Rule) => {
        if (compare(rule.content, searchTerm)) {
          results.push({
            chapterId: chapter.id,
            comboId: `${subchapter.id}.${rule.id}`,
            snippet: rule.content,
          })
        }

        rule.subrules.forEach((subrule) => {
          if (compare(subrule.content, searchTerm)) {
            results.push({
              chapterId: chapter.id,
              comboId: `${subchapter.id}.${rule.id}${subrule.id}`,
              snippet: rule.content,
            })
          }
        })
      })
    })
  })

  const total: number = results.length
  const shown = total < 20 ? total : 20

  return { data: results.slice(0, shown), total, shown }
}

function findExactId(searchTerm: string, chapters: types.Chapter[]): types.SearchResult | null {
  const ruleIdRegex = /^(\d{3})(\.\d{1,3})?([a-z])?$/i
  const matches = searchTerm.match(ruleIdRegex)

  if (matches != null) {
    let directResult = ""
    let helper: types.Subchapter | types.Rule | types.Subrule

    const subchapterId: string = matches[1]
    if (subchapterId) {
      const chapterId = Number(subchapterId[0])
      const ruleId: string = matches[2]
      const subruleId: string = matches[3]
      helper = chapters[chapterId - 1].subchapters[Number(subchapterId) - chapterId * 100]
      if (helper) {
        directResult = helper.title
      } else {
        return null
      }
      if (ruleId) {
        helper = helper.rules[Number(ruleId.slice(1)) - 1]
        if (helper) {
          directResult = helper.content
        } else {
          return null
        }
        if (subruleId) {
          helper = helper.subrules.filter((subrule) => subrule.id === subruleId)[0]
          if (helper) {
            directResult = helper.content
          } else {
            return null
          }
        }
      }

      return { chapterId: chapterId, comboId: searchTerm, snippet: directResult }
    }
  }

  return null
}

function compare(text: string, term: string): boolean {
  return text.toLowerCase().includes(term.toLowerCase())
}
