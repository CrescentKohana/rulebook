export interface Rulebook {
  chapters: Chapter[]
}

export interface Chapter {
  id: number
  title: string
  subchapters: Subchapter[]
}

export interface TinyChapter {
  id: number
  title: string
  subchapters: null | undefined
}

export interface Subchapter {
  id: number
  title: string
  rules: Rule[]
}

export interface Rule {
  id: number
  content: string
  subrules: Array<[string, string]>
}
