import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserNewComponent } from './users/user-new/user-new.component';
//Layouts
import {
  CondensedComponent,
  BlankComponent,
  CorporateLayout,
  SimplyWhiteLayout,
  ExecutiveLayout,
  CasualLayout,
  BlankCasualComponent,
  BlankCorporateComponent,
  BlankSimplywhiteComponent
} from './@pages/layouts';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/new',
    component: UserNewComponent
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent
  },
  { path: '**', component: UsersComponent }

  // {
  //   path: '',
  //   data: {
  //       breadcrumb: 'Home'
  //   },
  //   component: CondensedComponent
  // },
  // {
  //   path: 'casual',
  //   data: {
  //       breadcrumb: 'Home'
  //   },
  //   component: CasualLayout
  // },
  // {
  //   path: 'executive',
  //   data: {
  //       breadcrumb: 'Home'
  //   },
  //   component: ExecutiveLayout
  // },
  // {
  //   path: 'simplywhite',
  //   data: {
  //       breadcrumb: 'Home'
  //   },
  //   component: SimplyWhiteLayout
  // },
  // {
  //   path: 'corporate',
  //   data: {
  //       breadcrumb: 'Home'
  //   },
  //   component: CorporateLayout
  // },
];
