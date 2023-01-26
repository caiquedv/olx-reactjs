import React, { useEffect, useState } from "react";
import { PageContainer } from "../../AppStyles";
import { PageArea, SearchArea } from "./styled";
import { Link } from 'react-router-dom';

import { OlxAPI } from "../../helpers/OlxAPI";
import { AdItem } from "../../components/AdItem/AdItem";

import Cookies from 'js-cookie';

export const Home = () => {
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState<any>([]);
    // console.log(Cookies.get('tokenOlx'));
    useEffect(() => {
        const getStates = async () => {
            const slist = await OlxAPI.getStates();
            setStateList(slist);
        };
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await OlxAPI.getCategories();
            setCategories(cats);
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await OlxAPI.getAds({
                sort: 'desc',
                limit: 8
            });
            setAdList([json][0].data); //console.log(adList)
        };
        getRecentAds(); //console.log(adList[0].data)
    }, [stateList]);

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/olx-reactjs/ads">
                            <input type="text" name="q" placeholder="O que você procura?" />
                            <select name="state" id="">
                                {stateList.map((item: any, index) =>
                                    <option key={index} value={item.name}>{item.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((item: any, index) =>
                            <Link key={index} to={`/olx-reactjs/ads?cat=${item.slug}`} className="categoryItem">
                                <img src={item.img} alt="" />
                                <span>{item.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((item, index)=>
                            <AdItem key={index} data={item} />
                        )}
                    </div>
                    <Link to="/olx-reactjs/ads" className="seeAllLink">Ver Todos</Link>

                    <hr /> 
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit sunt qui ipsa saepe nam, iste recusandae cupiditate sint est omnis? Perferendis ipsum officiis, consequatur soluta aliquam sit quo odio sunt!
                </PageArea>
            </PageContainer>
        </>


    ); 
}