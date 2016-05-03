import DisplayImages from '/src/javascript/display-images';
import * as Dom from '/test/javascript/displayImagesDom';

describe('DisplayImages', function () {
  beforeEach(function () {
    Dom.rerender();
  });

  const mockFullData = {
    items: [
  	   {
  			title: "test",
  			description: " <p><a href=\"#\">test1<\/a> posted a photo:<\/p> <p><a href=\"#\" title=\"test1\"><img src=\"test2\" width=\"240\" height=\"160\" alt=\"test1\" /><\/a><\/p> "
  	   },
  	   {
  			title: "test 2",
  			description: " <p><a href=\"#\">test2<\/a> posted a photo:<\/p> <p><a href=\"#\" title=\"test2\"><img src=\"test2\" width=\"240\" height=\"160\" alt=\"test2\" /><\/a><\/p> <p><\/p>"
  	   }
     ]
   };

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

    spyOn(DisplayImages.prototype, 'renderAssets');

    let displayImages = new DisplayImages(mockData);

    expect(displayImages.images).toBe(mockData.items);
  });

  it('should call a render method if there is a container', () => {
    let mockData = {
      items: 0
    };

    spyOn(DisplayImages.prototype, 'renderAssets');

    let displayImages = new DisplayImages(mockData);

    expect(DisplayImages.prototype.renderAssets).toHaveBeenCalledWith(mockData.items);
  });

  it('should call a event binding method if there is a container', () => {
    let mockData = {
      items: 0
    };

    spyOn(DisplayImages.prototype, 'bindEvents');

    let displayImages = new DisplayImages(mockData);

    expect(DisplayImages.prototype.bindEvents).toHaveBeenCalled();
  });

  describe('renderAssets', function () {
    it('should equal a method', () => {
      let mockData = {
        items: []
      };
      let displayImages = new DisplayImages(mockData);

      expect(displayImages.renderAssets).toEqual(jasmine.any(Function));
    });

    it('should create a document fragment', () => {
      spyOn(document, 'createDocumentFragment').and.callThrough();

      let mockData = {
        items: []
      };
      let displayImages = new DisplayImages(mockData);

      expect(document.createDocumentFragment).toHaveBeenCalled();
    });

    it('should call a render asset method', () => {
      let mockData = {
        items: []
      };
      let displayImages = new DisplayImages(mockData);

      spyOn(displayImages, 'renderAsset').and.callThrough();

      displayImages.renderAssets(mockFullData.items);

      expect(displayImages.renderAsset.calls.allArgs()).toEqual(mockFullData.items.map(item => [item]));
    });
  });
});
