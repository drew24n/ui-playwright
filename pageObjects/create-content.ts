import { Locator, Page } from '@playwright/test';

export class CreateContent {
  readonly mainSection: Locator;
  private addWikiBtn: Locator;
  readonly wikiSectionIcon: Locator;
  private titleField: Locator;
  private descriptionField: Locator;
  private submitFieldBtn: Locator;
  private activeInput: Locator;
  private createBtn: Locator;
  private textArea: Locator;
  private saveBtn: Locator;
  readonly breadcrumbs: Locator;

  constructor(page: Page) {
    this.mainSection = page.locator('.virtuoso-grid-list');
    this.addWikiBtn = page.locator('li:has-text("Wiki Page")');
    this.wikiSectionIcon = page.locator('img[alt=Note]');
    this.titleField = page.locator('[title="Click to edit"]:has-text("Add title")');
    this.descriptionField = page.locator(
      '[title="Click to edit"]:has-text("Add description here")'
    );
    this.submitFieldBtn = page.locator('.gem-type-check');
    this.activeInput = page.locator('.InlineEditor__input');
    this.createBtn = page.locator('.ActionButton[title=Create]');
    this.textArea = page.locator('.fr-element.fr-view');
    this.saveBtn = page.locator('.ActionButton[title=Save]');
    this.breadcrumbs = page.locator('.Breadcrumbs');
  }

  async createWiki() {
    await this.addWikiBtn.click();
  }

  async fillTitle(text: string) {
    await this.titleField.click();
    await this.activeInput.fill(text);
    await this.submitFieldBtn.click();
  }

  async fillDescription(text: string) {
    await this.descriptionField.click();
    await this.activeInput.fill(text);
    await this.submitFieldBtn.click();
  }

  async createGem() {
    await this.createBtn.click({ delay: 1000, clickCount: 5 });
  }

  async fillTextArea(text: string) {
    await this.textArea.fill(text);
  }

  async saveChanges() {
    await this.saveBtn.click();
  }
}
