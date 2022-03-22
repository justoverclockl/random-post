import app from 'flarum/forum/app';
import DiscussionList from 'flarum/forum/components/DiscussionList';
import {extend} from 'flarum/common/extend';
import IndexPage from "flarum/forum/components/IndexPage";

app.initializers.add('justoverclock/random-post', () => {

  extend(DiscussionList.prototype, 'oncreate', function () {
    if (app.current.matches(IndexPage)) {

      const charLim = app.forum.attribute('justoverclock-random-post.charLimitRandomPost') || 280;

      app.store
        .find('posts', {
          include: 'discussion,user',
        })
        .then((results) => {

          this.randomPost = results[Math.floor(Math.random() * results.length)];

          const randomPostTitle = document.getElementById('random-post-text');
          randomPostTitle.innerHTML = this.randomPost.data.attributes.contentHtml.replace(/<\/?[^>]+(>|$)/g, '').substr(0, charLim);

          const randomAuthor = document.getElementById('random-post-author');
          const link = app.route.user(this.randomPost.user());
          const user = this.randomPost.user().displayName();
          const discussion = this.randomPost.discussion().data.attributes.title;
          const discussionLink = app.route.discussion(this.randomPost.discussion());
          randomAuthor.innerHTML = `<a href=${link}>${user}</a> in the <a href=${discussionLink}>${discussion}</a> `;
        });

      window.addEventListener('DOMContentLoaded', (event) => {
        const elements = document.querySelectorAll('.DiscussionListItem');
        const firstEl = elements.item(0); //
        console.log(firstEl);

        const newEl = document.createElement('div');
        newEl.innerHTML =
          '<div id="random-post-one"><div class="random-post-content">\n' +
          '        <p class="random-post-text" id="random-post-text"></p>\n' +
          '        <div class="random-post-info">\n' +
          '           <div class="random-post-author" id="random-post-author">\n' +
          '        </div>\n' +
          '      </div>' +
          '</div>';
        firstEl.appendChild(newEl);
      });
    }
  });
});



