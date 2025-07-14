import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Home } from './home/home';
import { Product } from './product/product';

import { Register } from './register/register';
import { Cart } from './cart/cart';
import { Login } from './login/login';
import { AddProduct } from './addproduct/addproduct';
import { Admin } from './admin/admin';
import { ProductList } from './productlist/productlist';
import { UpdateProduct } from './updateproduct/updateproduct';
import { Order } from './order/order';



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'about',component:About},
    {path:'contact',component:Contact},
    {path:'home',component:Home},
    // {path:'product',component:Product}, 
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'cart', component: Cart },
    {path:'addproduct',component:AddProduct},
    {path:'admin',component:Admin},
    {path:'productlist',component:ProductList},
    // {path:'updateproduct',component:UpdateProduct},

    { path: 'updateproduct/:id', component: UpdateProduct },
    {
  path: 'product',
  component: Product,
  runGuardsAndResolvers: 'always'
},

{path:'order',component:Order}
    

 

    
    
   
   
];
