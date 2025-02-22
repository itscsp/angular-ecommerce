import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'E-com Home'
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent,
    }, 
    {
        path: 'place-order',
        component: PlaceOrderComponent
    },
    {
        path: 'order-status',
        component: OrderStatusComponent
    },
    {
        path: '**',
        component:NotfoundComponent

    }
];
