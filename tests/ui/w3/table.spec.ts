import {expect, type Page} from '@playwright/test';
import {test} from 'fixtures/ui-hooks';
import {Table} from 'src/ui/components/table';

test.describe('Table:', () => {
  const homeURL = process.env.TABLE_URL;
  let page: Page;
  let table: Table;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    table = new Table(page);
    await page.goto(homeURL);
    await table.table().waitFor({state: 'visible'});
  });

  test('Check column titles', async () => {
    expect(await table.getColumnHeader()).toEqual([
      'First Name',
      'Last Name',
      'Company',
      'Address',
      'Favorite Number',
    ]);
  });

  test('Check First Name column content', async () => {
    expect(await table.getColumnTextContents('First Name')).toEqual(
      expect.arrayContaining(['Fred', 'Sara', 'Ralph', 'Nancy'])
    );
  });

  test('Check table sorting', async () => {
    await table.sortColumn({columnTitle: 'First Name', sortOrder: 'ascending'});

    expect(await table.getColumnSortingState('First Name')).toEqual('ascending');
    expect(await table.getColumnTextContents('First Name')).toBeSorted({
      descending: false,
      coerce: true,
    });

    await table.sortColumn({columnTitle: 'First Name', sortOrder: 'descending'});

    expect(await table.getColumnSortingState('First Name')).toEqual('descending');
    expect(await table.getColumnTextContents('First Name')).toBeSorted({
      descending: true,
      coerce: true,
    });
  });
});