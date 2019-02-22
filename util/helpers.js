// this regex will help us grab the step and note position of each note in the state
// since notes are stored in a flat object with each note having a key of `<step>:<note>`
export const noteRegex = /(?<step>\d*):(?<note>\d*)/;
