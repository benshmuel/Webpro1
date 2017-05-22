import { Webpro1Page } from './app.po';

describe('webpro1 App', function() {
  let page: Webpro1Page;

  beforeEach(() => {
    page = new Webpro1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
