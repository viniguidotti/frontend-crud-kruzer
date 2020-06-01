import { User } from './../user.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: User[] = [
  {_id: '1', name: 'Hydrogen', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '2', name: 'Helium', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '3', name: 'Lithium', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '4', name: 'Beryllium', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '5', name: 'Boron', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '6', name: 'Carbon', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '7', name: 'Nitrogen', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '8', name: 'Oxygen', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '9', name: 'Fluorine', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '10', name: 'Neon', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '11', name: 'Sodium', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '12', name: 'Magnesium', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '13', name: 'Aluminum', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '14', name: 'Silicon', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '15', name: 'Phosphorus', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '16', name: 'Sulfur', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '17', name: 'Chlorine', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '18', name: 'Argon', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '19', name: 'Potassium', email :'teste@teste', createdAt :'31/05/2020'},
  {_id: '20', name: 'Calcium', email :'teste@teste', createdAt :'31/05/2020'},
];

/**
 * Data source for the UserRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserRead2DataSource extends DataSource<User> {
  data: User[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: User[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
