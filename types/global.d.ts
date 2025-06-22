declare global {
  interface Window {
    trends: {
      embed: {
        renderExploreWidget: (type: string, options: any, config: any) => void
      }
    }
  }
}

export {}
