/* eslint-disable */
export const commentItem = (comment, ms = 0) => {
  const replySection = comment.reply
    ? `
      <a class="btn-reply collapsed" href="#_${comment.id}" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${comment.id}" data-comment-id="${comment.id}">
        <i class="fas fa-reply fa-rotate-180"></i>
        <span class="ms-1">${comment.reply} Replies</span>
      </a>
      <br>
      <ul class="reply-comment iq-menu p-0 collapse" id="_${comment.id}" style="list-style-type: none;"></ul>
    `
    : '';

  return `
  <ul class="post-comments p-0" class="ms-${ms}">
  <li class="mb-2 d-flex justify-content-between">
    <div class="d-flex flex-wrap">
      <div class="user-img">
        <a href="/${comment.user.key}">
          <img class="avatar-35 rounded-circle img-fluid" src="../img/users/${comment.user.avatar}" alt="userimg">
        </a>
      </div>
      <div class="comment-data-block ms-3 wrap-comment">
        <a href="/${comment.user.key}">
           <h6>${comment.user.username}</h6>
        </a>
        <p class="comment-content mb-0">${comment.comment}</p>
        <div class="block-add-form-create-comment">
          <div class="d-flex flex-wrap align-items-center comment-activity">
            <a href="#">like</a>
            <a class="btn-add-form-reply" href="#" data-parent-comment-id="${comment.id}" data-post-id="${comment.post}">reply</a>
            <span>${comment.moment}</span>
          </div>
          <div class="feather-icon comment-box">
            ${replySection}
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
          <a class="btnUpdateComment dropdown-item p-3" href="#" data-comment-id="${comment.id}">
            <div class="d-flex align-items-top">
              <i class="ri-pencil-line h4"></i>
              <div class="data ms-2">
                <p>Edit Comment</p>
              </div>
            </div>
          </a>
          <a class="btnDelComment dropdown-item p-3" href="#" data-comment-id="${comment.id}">
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

  `;
};
