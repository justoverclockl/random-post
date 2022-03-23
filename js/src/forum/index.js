import app from 'flarum/forum/app';
import DiscussionList from 'flarum/forum/components/DiscussionList';
import {extend} from 'flarum/common/extend';
import DiscussionListItem from "flarum/forum/components/DiscussionListItem";


app.initializers.add('justoverclock/random-post', () => {
  extend(DiscussionList.prototype, 'oninit', function (){
    app.store
      .find('posts', {
        include: 'discussion,user',
      })
      .then((results) => {
        this.randomPostOne = results[Math.floor(Math.random() * results.length)];
        this.randomPostTwo = results[Math.floor(Math.random() * results.length)];
        console.log(this.randomPostOne)
        console.log(this.randomPostTwo)

      })
  })
  extend(DiscussionList.prototype, 'view', function (vdom) {



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
                <div>{this.randomPostOne && this.randomPostOne.data.attributes.contentHtml.replace(/<\/?[^>]+(>|$)/g, '').substr(0, 200)}</div>);
          } else if (discussionIndex === 10){
            mapGroup.children.splice(mapGroup.children.indexOf(li), 0,
              <div>{this.randomPostOne && this.randomPostOne.data.attributes.contentHtml.replace(/<\/?[^>]+(>|$)/g, '').substr(0, 200)}</div>);
          } else if (discussionIndex === 19) {
            mapGroup.children.splice(mapGroup.children.indexOf(li), 0,
              <div>{this.randomPostOne && this.randomPostOne.data.attributes.contentHtml.replace(/<\/?[^>]+(>|$)/g, '').substr(0, 200)}</div>);
          }

          discussionIndex++;
        });
      });
    });
  });
});



