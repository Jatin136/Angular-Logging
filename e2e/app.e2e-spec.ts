import { AngularLoggingAppPage } from './app.po';

describe('angular-logging-app App', () => {
  let page: AngularLoggingAppPage;

  beforeEach(() => {
    page = new AngularLoggingAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
