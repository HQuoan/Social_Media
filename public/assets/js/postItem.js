/* eslint-disable */
export const postItem = (post) => {
  const imageBox =
    post.images.length > 0
      ? `
<div class="card-body">
      <ul class="profile-img-gallary p-0 m-0 list-unstyled">
         ${post.images
           .map(
             (image) => `
            <li><a href="#"><img src="../img/posts/${image}" alt="gallery-image" class="img-fluid rounded" /></a></li>
         `,
           )
           .join('')}
    </div>
`
      : '';

  const emojiBox =
    post.emojis.length > 0
      ? `
   ${post.emojis
     .map(
       (emoji) => `
        <a class="dropdown-item" href="#">
         ${emoji.user.username}
        <img class="f-right img-fluid" src="../assets/images/icon/${emoji.type}.png" alt="">
      </a>
      
    `,
     )
     .join('')}
   `
      : '';

  const shortComment =
    post.comments.length > 0
      ? `
   ${post.comments
     .map(
       (comment) => `
        <a class="dropdown-item" href="#">
         ${comment.user.username}
      </a>
      
    `,
     )
     .join('')}
   `
      : '';

  const btnSeeMore =
    post.comments.length > 0
      ? `
   <button class="load-more-comments btn rounded-pill" data-post-id="${post.id}">
      <i class="fas fa-reply fa-rotate-180"></i>
      <span class="ms-1">See more</span>
   </button>
   `
      : '';

  const commentBox =
    post.comments.length > 0
      ? `
      ${post.comments
        .map(
          (comment) => `
           <ul class="post-comments p-0b ms-0">
           <li class="mb-2 d-flex justify-content-between">
             <div class="d-flex flex-wrap">
               <div class="user-img">
               <a href="/${comment.user.key}">
               <img class="avatar-35 rounded-circle img-fluid" src="../img/users/${
                 comment.user.avatar
               }" alt="userimg">
               </a>
               </div>
               <div class="wrap-comment comment-data-block ms-3">
                 <a href="/${comment.user.key}">
                    <h6>${comment.user.username}</h6>
                 </a>
                 <p class="comment-content mb-0">${comment.comment}</p>
                 <div class="block-add-form-create-comment">
                   <div class="d-flex flex-wrap align-items-center comment-activity">
                     <a href="#">like</a>
                     <a class="btn-add-form-reply" href="#" data-parent-comment-id="${
                       comment.id
                     }" data-post-id="${comment.post}">reply</a>
                     <span>${comment.moment}</span>
                   </div>
                   <div class="comment-box feather-icon">
                      ${
                        comment.reply
                          ? `
                      <a class="btn-reply collapsed" href="#_${comment.id}" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${comment.id}" data-comment-id="${comment.id}">
                         <i class="fas fa-reply fa-rotate-180"></i>
                         <span class="ms-1">${comment.reply} Replies</span>
                       </a>
                       <br>
                       <ul class="reply-comment iq-menu p-0 collapse" id="_${comment.id}" style="list-style-type: none;">
                         <!-- Add logic to render reply comments here -->
                       </ul>
                      `
                          : ''
                      }
                   </div>
                 </div>
               </div>
             </div>
             <div class="card-post-toolbar">
               <div class="dropdown">
                 <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                   <i class="ri-more-fill vertical-icon"></i>
                 </span>
                 <div class="dropdown-menu m-0 p-0">
                   <a class="btnUpdateComment dropdown-item p-3" href="#" data-comment-id="${
                     comment.id
                   }">
                     <div class="d-flex align-items-top">
                       <i class="ri-pencil-line h4"></i>
                       <div class="data ms-2">
                         <p>Edit Comment</p>
                       </div>
                     </div>
                   </a>
                   <a class="btnDelComment dropdown-item p-3" href="#" data-comment-id="${
                     comment.id
                   }">
                     <div class="d-flex align-items-top">
                       <i class="ri-delete-bin-7-line h4"></i>
                       <div class="data ms-2">
                         <p>Delete</p>
                       </div>
                     </div>
                   </a>
                 </div>
               </div>
             </div>
           </li>
         </ul>
        `,
        )
        .join('')}
   `
      : '';

  ///////////////////////////////////////////////////////

  return `
  <div class="col-sm-12">
  <div class="card card-block card-stretch card-height">
    <div class="card-body">
      <div class="user-post-data">
        <div class="d-flex justify-content-between">
          <a href="/${post.user.key}" class="me-3">
            <img class="rounded-circle img-fluid avatar-60" src="./img/users/${post.user.avatar}" alt="">
          </a>
          <div class="w-100">
            <div class="d-flex justify-content-between">
              <div>
                <a href="/${post.user.key}">
                  <h5 class="mb-0 d-inline-block">${post.user.username}</h5>
                </a>
                <span class="ms-1 mb-0 d-inline-block">Add New Post</span>
                <p class="mb-0 text-primary">${post.moment}</p>
              </div>
              <div class="card-post-toolbar">
                <div class="dropdown">
                  <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    role="button">
                    <i class="ri-more-fill"></i>
                  </span>
                  <div class="dropdown-menu m-0 p-0">
                    <a class="dropdown-item p-3" href="#">
                      <div class="d-flex align-items-top">
                        <i class="ri-pencil-line h4"></i>
                        <div class="ms-2">
                          <h6>Edit Post</h6>
                          <p class="mb-0">Update your post and saved items</p>
                        </div>
                      </div>
                    </a>
                    <a class="dropdown-item p-3" href="#" data-post-id="${post._id}" class="btnDelPost">
                      <div class="d-flex align-items-top">
                        <i class="ri-delete-bin-7-line h4"></i>
                        <div class="ms-2">
                          <h6>Delete</h6>
                          <p class="mb-0">Remove this Post on Timeline</p>
                        </div>
                      </div>
                    </a>
                    <a class="dropdown-item p-3" href="#">
                      <div class="d-flex align-items-top">
                        <i class="ri-save-line h4"></i>
                        <div class="ms-2">
                          <h6>Save Post</h6>
                          <p class="mb-0">Add this to your saved items</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <p>${post.content}</p>
      </div>
      <div class="user-post">
        ${imageBox}
      </div>
      <div class="comment-area mt-3">
        <div class="d-flex justify-content-between align-items-center flex-wrap">
          <div class="like-block position-relative d-flex align-items-center">
            <div class="d-flex align-items-center">
              <div class="like-data">
                <div class="dropdown">
                  <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    role="button">
                    <img class="emoji-active-item img-fluid" src="../assets/images/icon/null.jpg" alt=""
                      data-post-id="${post.id}">
                  </span>
                  <div class="dropdown-menu py-2">
                    <a class="ms-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Like">
                      <img class="emoji-item img-fluid" src="../assets/images/icon/like.png" alt="" data-emoji="like">
                    </a>
                    <a class="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Love">
                      <img class="emoji-item img-fluid" src="../assets/images/icon/love.png" alt="" data-emoji="love">
                    </a>
                    <a class="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="HaHa">
                      <img class="emoji-item img-fluid" src="../assets/images/icon/haha.png" alt="" data-emoji="haha">
                    </a>
                    <a class="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Think">
                      <img class="emoji-item img-fluid" src="../assets/images/icon/think.png" alt="" data-emoji="think">
                    </a>
                    <a class="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Sade">
                      <img class="emoji-item img-fluid" src="../assets/images/icon/sade.png" alt="" data-emoji="sade">
                    </a>
                    <a class="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Lovely">
                      <img class="emoji-item img-fluid" src="../assets/images/icon/lovely.png" alt=""
                        data-emoji="lovely">
                    </a>
                    <a class="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Cancel">
                      <img class="emoji-item img-fluid" src="../assets/images/icon/null.jpg" alt="" data-emoji="null">
                    </a>
                  </div>
                </div>
              </div>
              <div class="total-like-block ms-2 me-3">
                <div class="dropdown">
                  <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    role="button">
                    ${post.countEmojis} Likes
                  </span>
                  <div class="dropdown-menu">
                    ${emojiBox}
                    <a class="dropdown-item" href="#">Max Emum
                      <img class="f-right img-fluid" src="../assets/images/icon/like.png" alt="">
                    </a>
                    <a class="dropdown-item" href="#">Hap E. Birthday
                      <img class="f-right img-fluid" src="../assets/images/icon/love.png" alt="">
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="total-comment-block">
              <div class="dropdown">
                <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  role="button">
                  ${post.countComments} Comment
                </span>
                <div class="dropdown-menu">
                  ${shortComment}
                  <a class="dropdown-item" href="#">Other</a>
                </div>
              </div>
            </div>
          </div>
          <div class="share-block d-flex align-items-center feather-icon mt-2 mt-md-0">
            <a href="javascript:void();" data-bs-toggle="offcanvas" data-bs-target="#share-btn"
              aria-controls="share-btn">
              <i class="ri-share-line"></i>
              <span class="ms-1">99 Share</span>
            </a>
          </div>
        </div>
        <hr>
        <div class="wrap-comment">
          <div class="comment-box">
            ${commentBox}
          </div>
          ${btnSeeMore}
          <form class="comment-form comment-text d-flex align-items-center mt-3">
            <textarea class="comment-txt form-control rounded-pill" name="comment" rows="1"
              placeholder="Enter Your Comment..."></textarea>
            <input name="post" value="${post.id}" type="hidden">
            <div class="comment-attagement d-flex">
              <button class="btn btnSubmitComment hover-blue" type="submit">
                <i class="fa fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
};
