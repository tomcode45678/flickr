import DisplayImages from '/src/javascript/display-images';
import * as Dom from '/test/javascript/displayImagesDom';

describe('DisplayImages', function () {
  it('should equal a class', () => {
    expect(DisplayImages.constructor.name).toEqual(jasmine.any(String));
  });

  it('should set image data to a cached property', () => {
    let mockData = {
      items: [
        {
    			title: "",
    			id: 29
    	   },
         {
    			title: "The Fall",
    			id: 20
    	   }
       ]
    };
    let displayImages = new DisplayImages(mockData);

    expect(displayImages.images).toBe(mockData.items);
  });
});
