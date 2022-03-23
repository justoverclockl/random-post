import app from 'flarum/forum/app';
import DiscussionList from 'flarum/forum/components/DiscussionList';
import {extend} from 'flarum/common/extend';
import DiscussionListItem from "flarum/forum/components/DiscussionListItem";
import IndexPage from "flarum/forum/components/IndexPage";


app.initializers.add('justoverclock/random-post', () => {
  extend(DiscussionList.prototype, 'oninit', function () {
    app.store
      .find('posts', {
        include: 'discussion,user',
      })
      .then((results) => {
        this.randomPostOne = results[Math.floor(Math.random() * results.length)];
        this.randomPostTwo = results[Math.floor(Math.random() * results.length)];
        this.randomPostTree = results[Math.floor(Math.random() * results.length)];
      })
  })
  extend(DiscussionList.prototype, 'view', function (vdom) {

    const charLim = app.forum.attribute('justoverclock-random-post.charLimitRandomPost') || 200;

    if (app.current.matches(IndexPage)) {
      m.redraw()
    }


    vdom.children.forEach(vdom => {

      // Find the child with class .DiscussionList-discussions
      if (!vdom || !vdom.attrs || vdom.attrs.className !== 'DiscussionList-discussions') {
        return;
      }

      let discussionIndex = 0;

      vdom.children.forEach(mapGroup => {


        // All children should be Mithril virtual group nodes "[" but we'll make sure no `null` or `undefined` got in here
        if (!mapGroup || !mapGroup.children) {
          return;
        }

        // Clone array so inserting new items into the original array doesn't cause the loop to skip items
        [...mapGroup.children].forEach((li) => {
          // Verify each child is an li containing a DiscussionListItem, this way we are not counting items added by other extensions
          if (li.tag !== 'li' || !li.children || !li.children.length || !li.children[0] || li.children[0].tag !== DiscussionListItem) {
            return;
          }

          // Add index to the DOM so it can be used from CSS
          li.attrs['data-index'] = discussionIndex;

          // Add content above each group of 3 discussions
          if (discussionIndex === 1) {


            // Use indexOf() to get the up to date index of the current element, since adding items will shift the index of next items
            mapGroup.children.splice(mapGroup.children.indexOf(li), 0,
              <div id="random-post-one">
                <div className="random-post-content">
                  <p className="random-post-text" id="random-post-text">
                    {this.randomPostOne && this.randomPostOne.data.attributes.contentHtml.replace(/<\/?[^>]+(>|$)/g, '').substr(0, charLim)}
                  </p>
                  <div className="random-post-info">
                    <div className="random-post-author" id="random-post-author">
                      <a
                        href={this.randomPostOne && 'u/' + this.randomPostOne.user().data.attributes.slug}>{this.randomPostOne && this.randomPostOne.user().displayName()}</a>
                      {app.translator.trans('justoverclock-random-post.forum.inThe')}
                      <a href={this.randomPostOne && 'd/' + this.randomPostOne.discussion().data.attributes.slug}>
                      {this.randomPostOne && this.randomPostOne.discussion().data.attributes.title}</a>
                    </div>
                  </div>
                </div>
              </div>);
          } else if (discussionIndex === 10) {
            mapGroup.children.splice(mapGroup.children.indexOf(li), 0,
              <div id="random-post-one">
                <div className="random-post-content">
                  <p className="random-post-text" id="random-post-text">
                    {this.randomPostTwo && this.randomPostTwo.data.attributes.contentHtml.replace(/<\/?[^>]+(>|$)/g, '').substr(0, charLim)}
                  </p>
                  <div className="random-post-info">
                    <div className="random-post-author" id="random-post-author">
                      <a
                        href={this.randomPostTwo && 'u/' + this.randomPostTwo.user().data.attributes.slug}>{this.randomPostTwo && this.randomPostTwo.user().displayName()}</a>
                      {app.translator.trans('justoverclock-random-post.forum.inThe')}
                      <a href={this.randomPostTwo && 'd/' + this.randomPostTwo.discussion().data.attributes.slug}>
                      {this.randomPostTwo && this.randomPostTwo.discussion().data.attributes.title}</a>
                    </div>
                  </div>
                </div>
              </div>);
          } else if (discussionIndex === 19) {
            mapGroup.children.splice(mapGroup.children.indexOf(li), 0,
              <div id="random-post-one">
                <div className="random-post-content">
                  <p className="random-post-text" id="random-post-text">
                    {this.randomPostTree && this.randomPostTree.data.attributes.contentHtml.replace(/<\/?[^>]+(>|$)/g, '').substr(0, charLim)}
                  </p>
                  <div className="random-post-info">
                    <div className="random-post-author" id="random-post-author">
                      <a
                        href={this.randomPostTree && 'u/' + this.randomPostTree.user().data.attributes.slug}>{this.randomPostTree && this.randomPostTree.user().displayName()}</a>
                      {app.translator.trans('justoverclock-random-post.forum.inThe')}
                      <a href={this.randomPostTree && 'd/' + this.randomPostTree.discussion().data.attributes.slug}>
                      {this.randomPostTree && this.randomPostTree.discussion().data.attributes.title}</a>
                    </div>
                  </div>
                </div>
              </div>);
          }

          discussionIndex++;
        });
      });
    });
  });
});


