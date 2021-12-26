import template from "./template.js";
import { api } from '../../../helper/axios.js';

// const homePost = document.getElementById('home-post');
// const data = homePost.getAttribute('data');
// if (data) {
//   const dataParse = JSON.parse(data);
//   data
// }
export default class HomeRoot extends HTMLDivElement {
  static get route() { return ""; }
  static get is() { return "home-root" }

  constructor() {
    super();
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    const script = document.createElement('script');
    script.textContent = `
       const renderType = {
        1:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Thích</p>',
        2:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Ha ha</p>',
        3:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Tức giận</p>',
        4:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Buồn</p>',
        5:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Yêu thích</p>',
        6:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Wow</p>', 
      }
      const likePost = (postId, type) => {
        const btnLike = document.getElementById("like-btn-" + postId);
        const actionPost = document.getElementById("action-post-" + postId);
        actionPost.setAttribute("me", JSON.stringify({ type }));
        
        actionPost.reset();

        btnLike.innerHTML = renderType[type];
        
        api.post('/posts/like', {
          postId, type,
        }).then((res) => {
          console.log(res);
        }).catch((error) => {
          alert(error.response.data ? error.response.data.message : 'Có lỗi xảy ra vui lòng thử lại');
        })
      }
      
      const displayComment = (id) => {
        const container = document.getElementById('commentPost' + id);
        console.log(container);
        container.innerHTML = '<comment-post postId="' + id + '"></comment-post>';
      }

      const newComment = (e, id) => {
        if (e.keyCode == 13 && e.target.value.length > 0) {
          const container = document.getElementById('commentPostFirst' + id);
          const myComment = document.createElement("div");
          myComment.setAttribute("class", "w100 flex alignCenter");
          myComment.innerHTML = "Loading....";
          container.appendChild(myComment);

          api.post('/posts/comment', {
            postId: id,
            content: e.target.value,
          }).then((res) => {
            const user = JSON.parse(localStorage.getItem('user'));
            myComment.innerHTML = '<div class="mt-1 flex alignCenter"><img src="' + user.avatar +'" class="smallAvatar" /><div class="commentContent"><div class="bold">' + user.full_name + '</div>' + e.target.value +'</div></div>';
          }).catch((e) => {
            container.removeChild(myComment);
          })
        }
      }
    `
    this.appendChild(script);

    templateEl.innerHTML = template().html;

    this.append(templateEl.content.cloneNode(true));

    api.get('/posts', {
      params: {
        offset: 0,
        limit: 10,
      }
    }).then((res) => {
      console.log(res, 11);
      const homePost = document.getElementById('home-post');
      homePost.setAttribute('data', JSON.stringify(res.data));
      homePost.reset();
    }).catch((e) => {

    });

    const state = template().states;
    const keys = Object.keys(state);
    keys.forEach(key => this.setAttribute(key, state[key], true));
  }
}