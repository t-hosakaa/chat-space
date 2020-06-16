require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can save' do
      it "contentがあれば保存できる" do
        expect(build(:message, image: nil)).to be_valid
      end
  
      it "imageがあれば保存できる" do
        expect(build(:message, content: nil)).to be_valid
      end
  
      it "contentとimageがあれば保存できる" do
        expect(build(:message)).to be_valid
      end
    end
    
    context 'can not save' do
      it "contentもimageも無いと保存できない" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end
  
      it "group_idが無いと保存できない" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
  
      it "user_idが無いと保存できない" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end

    

  end
end