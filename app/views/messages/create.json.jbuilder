json.id         @message.id
json.body       @message.body
json.data       @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name  @message.user.name
json.image      @message.image
