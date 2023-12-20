/* eslint-disable */
export const commentItem = (comment, ms = 0) => {
  const replySection = comment.reply
    ? `
      <div class="feather-icon">
        <a class="btn-reply collapsed" href="#_${comment.id}" data-bs-toggle='collapse' aria-expanded='false'  aria-controls="${comment.id}" data-comment-id="${comment.id}">
          <i class="fas fa-reply fa-rotate-180"></i>
          <span class="ms-1">${comment.reply} Replies</span>
        </a>
        <br>
        <ul class="reply-comment iq-menu p-0 collapse" id="_${comment.id}" style="list-style-type: none;">
        </ul>
      </div>
    `
    : '';

  return `
    <ul class="post-comments p-0 ms-${ms}">
      <li class="mb-2">
        <div class="d-flex flex-wrap">
          <div class="user-img">
            <img class="avatar-35 rounded-circle img-fluid" src="../img/users/${comment.user.avatar}" alt="userimg">
          </div>
          <div class="comment-data-block ms-3">
            <h6>${comment.user.username}</h6>
            <p class="mb-0">${comment.comment}</p>
            <div class="d-flex flex-wrap align-items-center comment-activity">
              <a href="#">like</a>
              <a href="#">reply</a>
              <span>${comment.moment}</span>
            </div>
            ${replySection}
          </div>
        </div>
      </li>
    </ul>
  `;
};
