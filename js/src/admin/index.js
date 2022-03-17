import app from 'flarum/admin/app';

app.initializers.add('justoverclock/random-post', () => {
  app.extensionData.for('justoverclock-random-post').registerSetting({
    setting: 'justoverclock-random-post.charLimitRandomPost',
    name: 'justoverclock-random-post.charLimitRandomPost',
    type: 'number',
    label: app.translator.trans('justoverclock-random-post.admin.limit'),
    help: app.translator.trans('justoverclock-random-post.admin.limit-help'),
  });
});
