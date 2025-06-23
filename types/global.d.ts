declare global {
  interface Window {
    trends: {
      embed: {
        renderExploreWidgetTo: (
          element: HTMLElement,
          type: string,
          options: {
            comparisonItem: Array<{
              keyword: string
              geo: string
              time: string
            }>
            category: number
            property: string
          },
          config: {
            exploreQuery: string
            guestPath: string
          },
        ) => void
      }
    }
  }
}

export {}
