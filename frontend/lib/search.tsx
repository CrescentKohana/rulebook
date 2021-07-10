import * as types from "../types"

function compare(text: string, term: string): boolean {
  return text.toLowerCase().includes(term.toLowerCase())
}

// todo: make this dynamic
function createSnippet(text: string): string {
  return text.substring(0, 140)
}

export function search(chapters: types.Chapter[], searchTerm: string): types.SearchResult[] | null {
  if (searchTerm.length < 3) {
    return null
  }

  const results: types.SearchResult[] = []

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
            snippet: createSnippet(rule.content),
          })
        }

        rule.subrules.forEach((subrule) => {
          if (compare(subrule.content, searchTerm)) {
            results.push({
              chapterId: chapter.id,
              comboId: `${subchapter.id}.${rule.id}${subrule.id}`,
              snippet: createSnippet(subrule.content),
            })
          }
        })
      })
    })
  })

  return results.slice(0, 10)
}
