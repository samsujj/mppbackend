import { MppbackendPage } from './app.po';

describe('mppbackend App', function() {
  let page: MppbackendPage;

  beforeEach(() => {
    page = new MppbackendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
