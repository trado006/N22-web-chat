TABLE post( 'type':enum[1:private, 2:public]->default(public),
            'status':enum[1:open, 2:closed])
//user 1 2 post
insert into posts(content,type, image_url, user_id, status)
values ('post 1', 2, '', 1, 1);
insert into posts(content,type, image_url, user_id, status)
values ('post 2', 2, '', 1, 1);
//user 2 2 post
insert into posts(content,type, image_url, user_id, status)
values ('post 1', 2, '', 2, 1);
insert into posts(content,type, image_url, user_id, status)
values ('post 2', 2, '', 2, 1);

