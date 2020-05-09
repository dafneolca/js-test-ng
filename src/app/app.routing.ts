import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
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
  // {
  //   path: 'users/:id',
  //   component: UserDetailComponent
  // },
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
