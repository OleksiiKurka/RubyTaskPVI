import axios from 'axios';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../Context/DataContext';
import "./MyCard.css"


function MyCard(props) {

  const { URL, user, } = useContext(DataContext);

  class commentsTree {

    constructor(value) {
      this.value = value;
      this.NextNode = [];
      this.FormRef = createRef(null);
    }

    addNode(Node) {
      if (Node.value.replycomment_id !== this.value.id)
        this.NextNode.forEach(x => x.addNode(Node));
      else
        this.NextNode = [...this.NextNode, Node]
    }

    timeFunction(time) {
      let tempTime = new Date(time.replace('T', ' ').replace('Z', ''));
      let now = new Date(Date.now());

      if (now.getFullYear() - tempTime.getFullYear() > 0)
        return `${now.getFullYear() - tempTime.getFullYear()} years ago`;
      else if (now.getMonth() - tempTime.getMonth())
        return `${now.getMonth() - tempTime.getMonth()} months ago`;
      else if (now.getDate() - tempTime.getDate())
        return `${now.getDate() - tempTime.getDate()} days ago`;
      else if (now.getHours() - 3 - tempTime.getHours())
        return `${now.getHours() - 3 - tempTime.getHours()} hours ago`;
      else if (now.getMinutes() - tempTime.getMinutes())
        return `${now.getMinutes() - tempTime.getMinutes()} minutes ago`;
      else return `< minute ago`;
    }


    postComment(ev) {
      ev.preventDefault();
      let form = this.FormRef.current;
      if (form["Comment"].value.trim() === "") { alert("empty field"); return; }
      debugger
      axios.post(URL.api + URL.addComment, {
        body: form["Comment"].value,
        replycomment_id: this.value.id,
        post_id: props.data.id
      }, URL.headers(user.token)
      ).catch((err) => { if (err.message) alert("Wrong input data") });;

    }
    display() {
      return (
        <div className="comment-div p-2 mt-3">
          <div className="row">
            <div className="col-2">
              <img className="rounded-circle z-depth-2 avatar-comment" alt="100x100" src={`https://avatars.dicebear.com/api/avataaars/${this.value.user.id}.svg`}
                data-holder-rendered="true" />
            </div>
            <div className="col-10 mt-2">
              <h6>{this.value.user.first_name + " " + this.value.user.last_name}</h6>

              <footer ref={this.timeRef} className="blockquote-footer">{this.timeFunction(this.value.created_at)} </footer>
            </div>
            <div className="container">
              <p className="text-muted ml-3 mt-3 comment-p p-1">{this.value.body}</p>
              <div className="d-flex">
                <a href="#" className="link-primary ml-auto" type="button" data-toggle="collapse" data-target={`#comment ${this.value.id}`} aria-expanded="false" aria-controls={`comment ${this.value.id}`}>
                  reply to comment
                </a>
              </div>
              <div className="collapse mx-1" id={`comment ${this.value.id}`}>
                <div className="mt-2 p-3 ">
                  <form ref={this.FormRef} >
                    <div className="input-group mb-3">
                      <input type="text" name={"Comment"} className="form-control input" placeholder="Your reply comment" aria-label="Recipient's username" aria-describedby="button-addon2" />
                      <a className="btn btn-outline-secondary ml-3" onClick={(ev) => this.postComment(ev)} type="button" id="button-addon2">Post</a>
                    </div>
                  </form>
                </div>
              </div>
              {this.NextNode.length > 0 &&
                this.NextNode.map(x => <div className="m-2" key={`comment sub ${x.value.id}`}>{x.display()}</div>)
              }
            </div>
          </div>
        </div>
      )


    }
  }
  const commentPostFrom = useRef(null);
  const [tempcomment, setTempComment] = useState(null);
  const timeElement = useRef(null);


  let postCommentToPos = (ev) => {
    ev.preventDefault();
    let form = commentPostFrom.current;
    if (form["CommentToPost"].value.trim() === "") { alert("empty field"); return; }

    axios.post(URL.api + URL.addComment, {
      body: form["CommentToPost"].value,
      post_id: props.data.id
    }, URL.headers(user.token)
    ).then(x=>alert("Posted please reload page")).catch((err) => { if (err.message) alert("Wrong input data") });

  }


  const getCreatedTime = (time) => {
    let tempTime = new Date(time.replace('T', ' ').replace('Z', ''));
    let now = new Date(Date.now());


    if (now.getFullYear() - tempTime.getFullYear() > 0)
      timeElement.current.innerText = `${now.getFullYear() - tempTime.getFullYear()} years ago`;
    else if (now.getMonth() - tempTime.getMonth())
      timeElement.current.innerText = `${now.getMonth() - tempTime.getMonth()} months ago`;
    else if (now.getDate() - tempTime.getDate())
      timeElement.current.innerText = `${now.getDate() - tempTime.getDate()} days ago`;
    else if (now.getHours() - 3 - tempTime.getHours())
      timeElement.current.innerText = `${now.getHours() - 3 - tempTime.getHours()} hours ago`;
    else if (now.getMinutes() - tempTime.getMinutes())
      timeElement.current.innerText = `${now.getMinutes() - tempTime.getMinutes()} minutes ago`;
      else return  timeElement.current.innerText =`< minute ago`;
  } 


  useEffect(
    () => {


      getCreatedTime(props.data.created_at);
      let temp = [...props.data.comments];
      if (temp.length === 0)
        return;
      let temp2 = temp.filter(x => x.replycomment_id === null).map(y => ({ arr: [y.id], Tree: new commentsTree(y) }));
      let temp3 = temp.filter(y => y.replycomment_id);
      if (temp3.length === 0) {
        setTempComment(temp2.map(x => <div key={`comment sub ${x.Tree.value.id}`}>{x.Tree.display()}</div>))
        return;
      }
      temp3.forEach(x => {
        temp2.forEach(z => {
          if (z.arr.indexOf(x.replycomment_id) >= 0) {
            z.Tree.addNode(new commentsTree(x));
            z.arr.push(x.id);
          }
        })
      }
      );

      setTempComment(temp2.map(x => <div key={`comment sub ${x.Tree.value.id}`}>{x.Tree.display()}</div>))
    }
    , [])

  const deletePost = () => {
    axios.delete(URL.api + URL.deletePost + "/" + props.data.id, URL.headers(user.token)
    ).then(x => alert(x.data.message)).catch((err) => { if (err.message) alert("Wrong input data") });;

  }
  return (

    <div className="mb-4" >
      <div className="card m-auto w-75 cards-div" >
        <div className="card-body">
          <div className="card-title mb-4">
            <div className="row">
              <div className="col-2">
                <img className="rounded-circle z-depth-2 avatar" alt="100x100" src={`https://avatars.dicebear.com/api/avataaars/${props.data.user.id}.svg`}
                  data-holder-rendered="true" />
              </div>
              <div className="col-8 mt-3">
                <h2 className="d-inline">{props.data.user.first_name + " " + props.data.user.last_name}</h2>

                {
                  (user.user_id == props.data.user.id || user.user_role === "admin") &&
                  <>
                    <button type="button " onClick={() => deletePost()} className="btn btn-danger ml-2 mb-2">Delete</button>
                  </>
                }
                <footer ref={timeElement} className="blockquote-footer"> </footer>
              </div>

              <div className="col-2 mt-3" >
                <div className="">

                  <button className="badge badge-secondary categories float-right">{props.data.category.name}</button>
                </div>
              </div>
            </div>
          </div>

          <h2 className="card-subtitle mb-2 text-muted">{props.data.title}</h2>
          <p className="card-text">{props.data.body}</p>
          <div className="my-3">
            {props.data.tags.length > 0 &&
              <>
                {props.data.tags.map(x => <button key={`tags ${x.id}`} className="badge badge-secondary mr-2 tags">{x.tag}</button>)}
              </>

            }
          </div>
          <button className="btn btn-outline-secondary mb-2" type="button" data-toggle="collapse" data-target={`#posts ${props.data.id}`} aria-expanded="false" aria-controls={`posts ${props.data.id}`}>
            See comments
          </button>


          <button className="btn btn-outline-secondary  mb-2 ml-2" type="button" data-toggle="collapse" data-target={`#addcommettoposts ${props.data.id}`} aria-expanded="false" aria-controls={`addcommettoposts ${props.data.id}`}>
            comment this post
          </button>



          <div className="collapse " id={`addcommettoposts ${props.data.id}`}>

            <form ref={commentPostFrom}>
              <div className="input-group mb-3">
                <input type="text" name={"CommentToPost"} className="form-control input" placeholder="Your reply comment" aria-label="Recipient's username" aria-describedby="button-addon" />
                <a className="btn btn-outline-secondary ml-3" onClick={(ev) => postCommentToPos(ev)} type="button" id="button-addon">Post</a>
              </div>


            </form>

          </div>

        </div>
        <div className="collapse mx-3" id={`posts ${props.data.id}`}>
          <div className="card card-body">
            {tempcomment}
          </div>
        </div>


      </div >
    </div >
  );
}

export default MyCard;
