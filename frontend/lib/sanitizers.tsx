import sanitizeHtml from "sanitize-html"

/**
 * Sanitizes HTML/text. Only a tags allowed with href and id attributes. Also no external URLs or protocols.
 *
 * @param text
 * @returns sanitized content
 */
export function keepLinks(dirtyContent: string): string {
  const cleanContent = sanitizeHtml(dirtyContent, {
    allowedTags: ["a"],
    allowedAttributes: {
      a: ["href", "id"],
    },
    allowedSchemes: [],
    allowProtocolRelative: false,
  })

  return cleanContent
}

/**
 * Sanitizes HTML/text completely, no tags are preserved. Content between tags is preserved, with the exception of
 * [ 'style', 'script', 'textarea', 'option', 'noscript' ] (library default).
 *
 * @param text
 * @returns sanitized content
 */
export function sanitize(dirtyContent: string): string {
  return sanitizeHtml(dirtyContent, { allowedTags: [] })
}
