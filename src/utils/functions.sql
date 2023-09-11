create or replace function deleteWaitUser(pos int) returns void as $$
delete from "Waitlist" where position=pos;
update "Waitlist" set position = position -1 where position > pos
$$
language sql

create or replace function moveDownWaitUser(pos_input int, user_id_input uuid) returns void as $$
--move entry entry below up one position
update "Waitlist" set position= (position-1) where position = (pos_input + 1);
update "Waitlist" set position = (position + 1) where user_id= user_id_input;
$$
language sql