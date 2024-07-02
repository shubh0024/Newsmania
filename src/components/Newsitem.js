import React, { Component } from 'react'

export class Newsitem extends Component {

  render() {
    let { title, description, imageUrl, url, author, date,source } = this.props; //destructing concepts 
    return (
      <div  >

        <div className="card" style={{ width: "" }}>
        <span class="position-absolute top-0  translate-middle badge rounded-square bg-info" style ={{left:'82%',zIndex:'1'}}>
              {source}<span class="visually-hidden">unread messages</span>

            </span>
          <img src={!imageUrl ? "https://www.livemint.com/lm-img/img/2024/03/07/1600x900/PTI03-06-2024-000334A-0_1709802101257_1709802117217.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}... </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text "><small className=" text-danger">By {author ? author : "unknown"} on {new Date(date).toGMTString()} </small></p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read more!</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
