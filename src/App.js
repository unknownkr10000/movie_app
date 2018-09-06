import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';

class App extends Component {

//*******Component Lifecycle************
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update ComponentWillReceiveProps() -> shouldComponentUpdate() -> compoentWillUpdate()
  //-> render() -> componentDidUpdate()
//componentWillMount() -> render() -> componentDidMount() 순서대로 처리됨

  state = {

  }

  componentDidMount() { //컴포넌트가 didmount 했을 시, 불러옴

    this._getMovies(); //데이터 사이즈가 클때 didMount에 몰려있기보다는 작은 function들이 각기 다른 장소에 들어있는게 좋음

      }//state를 직접적으로 쓰면 안됨(직접적으로 쓰면 위의 render 설정이 작동하지 않기때문)
//promise는 빌드를 성공적으로 수행, 그렇지 않을 경우 결과물을 catch, then 으로 받아볼 수 있음
//then 원하는대로 바꿀 수 있음. 에러도 마찬가지


//새로운 함수 생성
_renderMovies = () => { //state없으면 movies 프로퍼티를 읽어올 수 없
  const movies = this.state.movies.map(movie => {
    console.log(movie)
    return <Movie title={movie.title}
    poster={movie.medium_cover_image}
    key={movie.id}
    genres={movie.genres}
    synopsis={movie.synopsis}
    />
  })//movie.js의 Movie컴포넌트에서 props 추가 업데이트
  return movies
}

//async, await
//didMount하고 나서 getMovies
_getMovies = async () => {  //async 펑션, movies라는 변수를 갖고있음
  const movies = await this._callApi() //_callApi라는 펑션을 await라는 모드에서(값)
  //await은 callapi 기능이 뭘 return하던 단지 끝나기를 기다리는 것
  //callapi의 return value를 movies에 set
  this.setState({ //이 컴포너트의 setState를 movies로 설정(callapi의 리턴값)
    movies
  })//setState는 callapi작업이 완료되기 전까지는 실행되지 않음

}


_callApi = () => {
  //fetch라는 이름의 promise를 리턴
  return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')//fetch의 장점은 url을 ajax로 불러들일 수 있음
  .then(response => response.json()) //위의 라인이 완료되면 뭔가를 하라, 에러가 있으면 catch해서 보여준다
  //then function은 1의 어트리뷰트(오브젝트))만 줌
  //response : fetch()의 결과물
  .then(json => json.data.movies) //fetch, then, json
  .catch(err => console.log(err))

}

render() {
    const {movies} = this.state;
    return ( // ?(=if) true : false
    //state에 movies가 있는지 물어봄. 있으면 App, 없으면 app loading
      <div className={movies ? "App" : "App--loading"}>
      {movies ? this._renderMovies() : 'Loading...'}
      </div>//데이터가 있는지 물어보는 것, 데이터가 있으면 renderMovies실행,
      //state안에 movies가 있으면 renderMovies라는 펑션을 불러올 것임
    );
  }
}

export default App;
