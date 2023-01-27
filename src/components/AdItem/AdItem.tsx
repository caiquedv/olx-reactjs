import React, { useState } from "react";
import { Item } from './styled';
import { Link } from 'react-router-dom';

export const AdItem = (props) => {
    let price = '';

    if (props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    } //console.log(props.data.img)
    //  console.log(props.data.img);

    return (
        <Item className="adItem">
            <Link to={`/olx-reactjs/ad/${props.data.id ? props.data.id : props.data._id}`}>
                <div className="itemImage">

                    {/* {!props.data.images &&
                        <img src={`http://localhost:2000/media/${props.data.images[0] ? props.data.images[0].url : 'default.jpg'}`}
                            alt=""
                        />
                    } */}

                    <img src={props.data.img ?? "http://localhost/adianti/template/app/images/adImages/default.jpg"} alt="" />

                </div>
                <div className="itemName">{props.data.title}</div>
                <div className="itemPrice">{price}</div>
            </Link>
        </Item>
    );
}