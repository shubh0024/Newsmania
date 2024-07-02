import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category:"general",
  }

  static propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
  }
  capitalizeFirstLetter =(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



   
  constructor(props){
    super(props); //alwys try to initiate tthe constructor

    this.state={

      articles: [],
      loading:true,
      page:1,
      totalResults: 0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NEWSBUCKET`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88b0d5ee6b224dcdbf293c30b4c2df95&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
   
    let data = await fetch(url);  //fetch wil take api url link
    this.props.setProgress(50);
    let parsedData = await data.json()
    this.props.setProgress(90);
    console.log(parsedData); //promises jo data aya hai usko  changekr ne liye 
    this.setState({articles:parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false,
     

    })
    this.props.setProgress(100);

  }

  
  //components id  mount is a life cycle it run after the render done 
  async componentDidMount(){ //asynchronous function wait karega 

  //   let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88b0d5ee6b224dcdbf293c30b4c2df95&page=1&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data = await fetch(url);  //fetch wil take api url link
  //   let parsedData = await data.json()
  //   console.log(parsedData); //promises jo data aya hai usko  changekr ne liye 
  //   this.setState({articles:parsedData.articles,totalArticles: parsedData.totalResults,loading:false})

  //function calling !
  this.updateNews();

  }
  handlePrevclick= async ()=>{
    
    // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88b0d5ee6b224dcdbf293c30b4c2df95&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);  //fetch wil take api url link
    // let parsedData = await data.json()
    // console.log(parsedData); //promises jo data aya hai usko  changekr ne liye 
    // // this.setState({})
    //     // page:page+1;
    //     this.setState({
    //       page:this.state.page - 1,
    //       articles:parsedData.articles,
    //       loading:false
    //     })
    this.setState({page:this.state.page - 1});
    this.updateNews();
  }

 handleNextclick= async  ()=>{
  // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88b0d5ee6b224dcdbf293c30b4c2df95&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //        this.setState({loading:true});
  //        let data = await fetch(url);  //fetch wil take api url link
         
  //        let parsedData = await data.json()
  //       //  this.setState.apply({loading:false});
  //         // console.log(parsedData); //promises jo data aya hai usko  changekr ne liye 
  //        // this.setState({})
  //        // page:page+1;
  //         this.setState({
  //         page:this.state.page + 1,
  //         articles:parsedData.articles,
  //         loading: false
  //       })
  //     }
  this.setState({page:this.state.page + 1});
  this.updateNews()
    }
    

   fetchMoreData = async () => {
    this.setState({page:this.state.page + 1})
    const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88b0d5ee6b224dcdbf293c30b4c2df95&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);  //fetch wil take api url link
    let parsedData = await data.json()
    console.log(parsedData); //promises jo data aya hai usko  changekr ne liye 
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      

    })
   };
 

  



    render(){
    
 
      console.log("render")
    return (
     

      <div className="container my-3">
        <h1 className="text-center">Latest News! -Top headlines</h1>
        {this.state.loading && <Spinner/>} 
        {/* this says that if the loading is true than show */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

        <div className="row my-4">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,45):""} imageUrl={element.urlToImage}
          url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        })}
         </div>
          
          {/* <div className="conatiner d-flex justify-content-between my-4">
          <button disabled={this.state.page<=1} type="button" cursor="pointer" className="btn btn-danger" onClick={this.handlePrevclick}> &larr; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-danger"  onClick={this.handleNextclick}> Next &rarr;</button>
      </div> */}
      
      </div>  
      </InfiniteScroll>
      </div> 
    
      
    )
  }
}


export default News;