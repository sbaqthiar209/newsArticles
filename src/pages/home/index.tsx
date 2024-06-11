import { Box, Checkbox, Typography } from "@mui/material";
import styles from "./home.module.scss";
import {useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/card";
export interface CardsDataModel {
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}
interface FilterModel {
  selected: boolean;
  filterValue: string;
}
type SortModel = FilterModel;

const Home = () => {
  const [cardsDisplayed, setCardsDisplayed] = useState<CardsDataModel[]>([]);
  const [cardsData, setCardsData] = useState<CardsDataModel[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<FilterModel[]>([]);
  const [authorFilters, setAuthorFilters] = useState<FilterModel[]>([]);
  const [sortFilter, setSortFilter] = useState<SortModel[]>([
    {
      selected:false,
      filterValue:"Date"
    },
    {
      selected:false,
      filterValue:"Title"
    }
  ]);


  const fetchPageData = async () => {
    const response = await axios.get(
      "https://dev-storm-rest-api.pantheonsite.io/api/v1/news"
    );
    if (Array.isArray(response?.data) && response?.data?.length > 0) {
      setCardsDisplayed(response?.data as CardsDataModel[]);
      setCardsData(response?.data as CardsDataModel[]);
      setCategoryFilters(
        Array.from(new Set(response?.data?.map((item) => item.source))).map(
          (item) => ({ selected: true, filterValue: item } as FilterModel)
        )
      );
      setAuthorFilters(
        Array.from(new Set(response?.data?.map((item) => item.author))).map(
          (item) => ({ selected: true, filterValue: item } as FilterModel)
        )
      );
    }
  };
  useEffect(() => {
    fetchPageData();
  }, []);
  const updateCategoryFilter = (newValue:boolean,position:number)=>{
    setCategoryFilters(categoryFilters.map((item,i)=>{
      return i===position ? {...item,selected:newValue} : item
    }))
  }
  const updateAuthorFilter = (newValue:boolean,position:number)=>{
    setAuthorFilters(authorFilters.map((item,i)=>{
      return i===position ? {...item,selected:newValue} : item
    }))
  }
  const updateSortFilter = (newValue:boolean,position:number)=>{
    setSortFilter(sortFilter.map((item,i)=>{
      return {...item, selected: position===i ? true:false}
    }))
  }
  const sortAsPerDate = ()=>{
    const newValues = cardsDisplayed.sort((a,b)=>(new Date(b.date).getTime() - new Date(a.date).getTime()));
    console.log("sorted--",newValues)
    setCardsDisplayed(newValues);
  }
  const sortAsPerTitle = ()=>{
    const newValues = cardsDisplayed.sort(function(a, b){
      var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
      if (nameA < nameB)
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; 
     });

    console.log("sorted--",newValues)
    setCardsDisplayed(newValues);
  }
  useEffect(()=>{
    const sortBy = sortFilter.find(item=>item.selected)?.filterValue
    if(sortBy==="Date"){
      sortAsPerDate()
    }
    else {
      sortAsPerTitle()
    }
  },[sortFilter])
  useEffect(()=>{
    let allFilteredResults = cardsData;
   if(categoryFilters){
    const selectedFilters = categoryFilters.filter(filter=>filter.selected===true);
    const filteredDisplayList = allFilteredResults.filter(card=>{
      return selectedFilters.some(item=>card?.source.includes(item.filterValue))
    })
    if(filteredDisplayList && filteredDisplayList.length>0){
        allFilteredResults = filteredDisplayList;
    }
   }
   if(authorFilters){
    const selectedFilters = authorFilters.filter(filter=>filter.selected===true);
    const filteredDisplayList = allFilteredResults.filter(card=>{
      return selectedFilters.some(item=>card?.author.includes(item.filterValue))
    })
    if(filteredDisplayList && filteredDisplayList.length>0){
      setCardsDisplayed(filteredDisplayList)
    }
   }
  },[categoryFilters,authorFilters])
  return (
    <>
      <Box className={styles.homeContainer}>
        <Box className={styles.filterPanel}>
          <Box className={styles.filterCategory}>
            <Typography variant="body1" fontWeight={"700"}>
              Category
            </Typography>
            <Box className={styles.test}>
                {
                  categoryFilters && categoryFilters?.map((filter,i)=>{
                    return (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        p={"0px 20px"}
                        key={i}
                      >
                        <Checkbox size="small" checked={filter.selected} onChange={(e)=>updateCategoryFilter(e.target.checked, i)}/>
                        <Typography variant="body1">{filter.filterValue}</Typography>
                      </Box>
                    );
                  })
                }
            </Box>
          </Box>
          <Box className={styles.filterAuthor}>
            <Typography variant="body1" fontWeight={"700"}>
              Author
            </Typography>
            <Box className={styles.test}>
                {
                  authorFilters && authorFilters?.map((filter,i)=>{
                    return (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        p={"0px 20px"}
                        key={i}
                      >
                        <Checkbox size="small" checked={filter.selected} onChange={(e)=>updateAuthorFilter(e.target.checked, i)}/>
                        <Typography variant="body1">{filter.filterValue}</Typography>
                      </Box>
                    );
                  })
                }
            </Box>
          </Box>
          <Box className={styles.filterAuthor}>
            <Typography variant="body1" fontWeight={"700"}>
              SortBy
            </Typography>
            <Box className={styles.test}>
                {
                  sortFilter.map((filter,i)=>{
                    return (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        p={"0px 20px"}
                        key={i}
                      >
                        <Checkbox size="small" checked={filter.selected} onChange={(e)=>updateSortFilter(e.target.checked, i)}/>
                        <Typography variant="body1">{filter.filterValue}</Typography>
                      </Box>
                    );
                  })
                }
            </Box>
          </Box>
        </Box>
        <Box className={styles.cardsPanel}>
          {cardsDisplayed &&
            cardsDisplayed?.length > 0 &&
            cardsDisplayed.map((item, i) => {
              return <Card cardKey={i} {...item} />;
            })}
        </Box>
      </Box>
    </>
  );
};
export default Home;
