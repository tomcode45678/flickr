/* globals console */

export default class DisplayImages {
  constructor (data) {
    this.images = data.items;
    console.log(data.items);
  }
}
