import interact from 'interactjs'

const clamp = (value) => Math.max(0, Math.min(1, value))

const getIndex = (event) => {
  const index = parseInt(event.target.getAttribute('data-index'), 10)

  return Number.isNaN(index) ? null : index
}

const getCanvasSize = (getCanvasDimensions) => {
  const { canvasWidth, canvasHeight } = getCanvasDimensions()

  return {
    canvasWidth,
    canvasHeight,
    isValid: canvasWidth > 0 && canvasHeight > 0,
  }
}

const initRectangleInteraction = ({
                                    focuspoints,
                                    activateFocuspoint,
                                    getCanvasDimensions,
                                  }) => {
  interact('.draggable')
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      modifiers: [
        interact.modifiers.restrictEdges({
          outer: 'parent',
          endOnly: true,
        }),
      ],
      listeners: {
        move(event) {
          const index = getIndex(event)
          const { canvasWidth, canvasHeight, isValid } = getCanvasSize(getCanvasDimensions)

          if (index === null || !isValid) {
            return
          }

          focuspoints.update((items) => items.map((point, currentIndex) => {
            if (currentIndex !== index) {
              return point
            }

            const x = ((point.x ?? 0) * canvasWidth) + event.deltaRect.left
            const y = ((point.y ?? 0) * canvasHeight) + event.deltaRect.top

            return {
              ...point,
              width: event.rect.width / canvasWidth,
              height: event.rect.height / canvasHeight,
              x: clamp(x / canvasWidth),
              y: clamp(y / canvasHeight),
            }
          }))
        },

        end(event) {
          const index = getIndex(event)

          if (index !== null) {
            activateFocuspoint(index)
          }
        },
      },
    })
    .draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],
      autoScroll: true,
      listeners: {
        move(event) {
          const index = getIndex(event)
          const { canvasWidth, canvasHeight, isValid } = getCanvasSize(getCanvasDimensions)

          if (index === null || !isValid) {
            return
          }

          focuspoints.update((items) => items.map((point, currentIndex) => {
            if (currentIndex !== index) {
              return point
            }

            const x = ((point.x ?? 0) * canvasWidth) + event.dx
            const y = ((point.y ?? 0) * canvasHeight) + event.dy

            return {
              ...point,
              x: clamp(x / canvasWidth),
              y: clamp(y / canvasHeight),
            }
          }))
        },

        end(event) {
          const index = getIndex(event)

          if (index !== null) {
            activateFocuspoint(index)
          }
        },
      },
    })
}

const initLineInteraction = ({
                              focuspoints,
                              activateFocuspoint,
                              getCanvasDimensions,
                            }) => {
  interact('.line-handle')
    .draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: false,
        }),
      ],
      listeners: {
        start(event) {
          const index = getIndex(event)

          if (index !== null) {
            activateFocuspoint(index)
          }
        },

        move(event) {
          const index = getIndex(event)
          const handle = event.target.getAttribute('data-handle')
          const { canvasWidth, canvasHeight, isValid } = getCanvasSize(getCanvasDimensions)

          if (index === null || !handle || !isValid) {
            return
          }

          focuspoints.update((items) => items.map((point, currentIndex) => {
            if (currentIndex !== index) {
              return point
            }

            const fallbackX2 = clamp((point.x ?? 0) + (point.width ?? 0.2))
            const fallbackY2 = clamp((point.y ?? 0) + (point.height ?? 0.2))

            const currentX = handle === 'start'
              ? (point.x ?? 0) * canvasWidth
              : (point.x2 ?? fallbackX2) * canvasWidth

            const currentY = handle === 'start'
              ? (point.y ?? 0) * canvasHeight
              : (point.y2 ?? fallbackY2) * canvasHeight

            const nextX = clamp((currentX + event.dx) / canvasWidth)
            const nextY = clamp((currentY + event.dy) / canvasHeight)

            if (handle === 'start') {
              return {
                ...point,
                x: nextX,
                y: nextY,
              }
            }

            return {
              ...point,
              x2: nextX,
              y2: nextY,
            }
          }))
        },
      },
    })
}

const initCrosshairInteraction = ({
                                    focuspoints,
                                    activateFocuspoint,
                                    getCanvasDimensions,
                                  }) => {
  interact('.crosshair-handle')
    .draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: false,
        }),
      ],
      listeners: {
        start(event) {
          const index = getIndex(event)

          if (index !== null) {
            activateFocuspoint(index)
          }
        },

        move(event) {
          const index = getIndex(event)
          const { canvasWidth, canvasHeight, isValid } = getCanvasSize(getCanvasDimensions)

          if (index === null || !isValid) {
            return
          }

          focuspoints.update((items) => items.map((point, currentIndex) => {
            if (currentIndex !== index) {
              return point
            }

            const currentX = (point.x ?? 0) * canvasWidth
            const currentY = (point.y ?? 0) * canvasHeight

            return {
              ...point,
              x: clamp((currentX + event.dx) / canvasWidth),
              y: clamp((currentY + event.dy) / canvasHeight),
            }
          }))
        },
      },
    })
}

export const initFocuspointInteractions = ({
                                            focuspoints,
                                            activateFocuspoint,
                                            getCanvasDimensions,
                                          }) => {
  const config = {
    focuspoints,
    activateFocuspoint,
    getCanvasDimensions,
  }

  initRectangleInteraction(config)
  initLineInteraction(config)
  initCrosshairInteraction(config)

  return () => {
    interact('.draggable').unset()
    interact('.line-handle').unset()
    interact('.crosshair-handle').unset()
  }
}
