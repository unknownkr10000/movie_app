import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'
import './Movie.css';

function Movie({title, poster, genres, synopsis}) { //여기서 사용할 props 이름을 지정해줌
  return ( //functional 컴포넌트에서는 this.props. ...를 삭제해줘야함 (클래스 컴포넌트가 아니기 때문)
  //자바스크립트에서의 css 클래스는 classname으로 사용
    <div className = "Movie">
      <div className = "Movie_Columns">
      <MoviePoster poster={poster} alt={title}/>
      </div>
      <div className = "Movie_Columns">
      <h1>{title}</h1>
      <div className = "Movie_Genres">
        {genres.map((genre, index) => <MovieGenre genre={genre} key={index}/>)}
        </div>
        <div className = "MovieSynopsis">
        <LinesEllipsis
            text={synopsis}
            maxLine='3'
            ellipsis='...'
            trimRight
            basedOn='letters'
            />
        </div>
      </div>
    </div>

  )
}

function MoviePoster({poster, alt}) {  //poster(props) **functional component**
  return (
    <img src={poster} alt={alt} title={alt} className = "Movie_Poster"/>
    //alt="MoviePoster"는 밑에서 alt를 props로 추가했기때문에 수정
    //title={alt}는 포스트에 마우스를 위치했을때 타이틀을 띄워주는 용도
     //html태그
  ) //state가 없음, function render 또는 라이프 사이클도 없고 return만 있음
}//class 컴포넌트 대신

function MovieGenre({genre}) { //functional component
  return(
    <span className = "Movie__Genre">{genre} </span>
  )
}

Movie.propTypes = {   //propTypes 작성
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  synopsis: PropTypes.string.isRequired
}

MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

MovieGenre.propTypes = {
  genre: PropTypes.string.isRequired
}



export default Movie
