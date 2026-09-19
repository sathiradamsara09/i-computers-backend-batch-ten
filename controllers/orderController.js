import Order from "../models/order.js"
import Product from "../models/product.js"


export default async function createOrder(req,res) {

    const user = req.user

    if(user == null){
        res.status(401).json({
            message : "You need to be logged in to place an order"
        })
        return
    }

    //let orderId = "ORD00000001"
    
    const orderData ={
        orderId: "ORD00000001",
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        phone: req.body.phone,
        total: 0,
        items: []
    }

    if(req.body.firstName != null && req.body.firstName != ""){
        orderData.firstName = req.body.firstName
    }

    if(req.body.lastName != null && req.body.lastName != ""){
        orderData.lastName = req.body.lastName
    }

    try{

        const lastOrder = await Order.findOne().sort({ date: -1 })

        

        if(lastOrder != null){
            //ORD00000039
            const lastOrderId = lastOrder.orderId //"ORD00000039"

            const lastOrderNumberInString = lastOrderId.replace("ORD", "") //"00000039"

            const lastOrderNumber = parseInt(lastOrderNumberInString) //39
            
            const newOrderNumber = lastOrderNumber + 1 //40

            const newOrderNumberInString = String(newOrderNumber).padStart(8, "0") //"00000040"

            orderData.orderId = "ORD" + newOrderNumberInString //"ORD00000040"


        }

        /*
        "productId : "PROD00000001", quantity : 2}
        */

        for(let i=0; i<req.body.items.length; i++){

            const product = await Product.findOne({productId : req.body.items[i].productId})
            //if(product == null || !product.isAvailable || product.stock < req.body.items[i].quantity){
            if(product == null || !product.isAvailable){
                res.status(400).json({
                    message : "Product with productId " + req.body.items[i].productId + " not found. Please place your order without this product."
                })
                return
            }else{

                orderData.items.push({
                product: {
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    labelledPrice: product.labelledPrice,
                    image: product.images[0]
                },
                    quantity : req.body.items[i].quantity
                })

                orderData.total += product.price * req.body.items[i].quantity
            }
        }

        const newOrder = new Order(orderData)

        await newOrder.save()

        //Reduce stock of products
        //for(let i=0; i<req.body.items.length; i++){
        //    await Product.findOneAndUpdate(
        //        {productId : req.body.items[i].productId},
        //        {$inc : {stock : -req.body.items[i].quantity}}
        //    )
        //}
        
        res.status(201).json({
            message : "Order created successfully",
        })

    }catch(error){

        res.status(500).json({
            message : "Error creating order",
        })
    }
}