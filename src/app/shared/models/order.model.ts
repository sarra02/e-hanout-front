import {Client} from './client.model';
import {ProductItem} from './product-item.model';

export class Order {

  public id:number;
  public client:Client={name:"",address:"",phoneNumber:"",email:"",username:""};
  public products:Array<ProductItem>=[];
  public totalAmount:number;
  public date:Date;

}
