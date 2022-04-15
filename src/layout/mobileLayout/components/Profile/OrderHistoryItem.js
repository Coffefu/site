import React from "react";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import moment from "moment";

const OrderHistoryItem = ({ item }) => {

    return (
        <div className={'row card mb-4'}>
            <Card>
                <CardContent className='card-body'>
                    <div className='row'>
                        <div className='col-4'>
                            <h5 className='card-title'>
                                № {item.order_number}
                            </h5>
                        </div>
                        <div className='col-8'>
                            <h5 className='card-title'>
                                {item.coffee_house.name + ' ' + item.coffee_house.placement}
                            </h5>
                        </div>
                    </div>
                    <div className='col'>
                        <h5 className='card-title'>
                            {moment(item.time).format('DD MM HH:mm')}
                        </h5>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            {
                                item.products.map((product, index) => {
                                    return (
                                        <div className='row' key={index}>
                                            <div className='col'>
                                                {product.name} {product.toppings[0] ? '-' + product.toppings[0].name : ''}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};

export default OrderHistoryItem;