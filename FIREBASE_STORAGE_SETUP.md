# Firebase Firestore 設置說明

## 🔧 使用 Firestore Database 存儲附件

本專案使用 **Firestore Database** 存儲博客文章和附件（不使用 Firebase Storage）。

### 附件存儲方式

- 附件轉換為 base64 編碼
- 大文件自動分塊（每塊 800KB）
- 存儲在 Firestore 子集合中：`blogs/{blogId}/attachments/{fileId}/chunks`
- 支持最大 15MB 文件

### Firestore 規則設置

前往 [Firebase Console](https://console.firebase.google.com/) → Firestore Database → Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 博客文章
    match /blogs/{blogId} {
      // 允許所有人讀取
      allow read: if true;
      
      // 只允許管理員寫入
      allow create, update, delete: if request.auth != null 
        && request.auth.token.email == 'friedturtleee@gmail.com';
      
      // 附件分塊
      match /attachments/{fileId}/chunks/{chunkId} {
        allow read: if true;
        allow write, delete: if request.auth != null 
          && request.auth.token.email == 'friedturtleee@gmail.com';
      }
    }
  }
}
```

### 設置授權域名

前往 **Authentication** → **Settings** → **Authorized domains**

確保已添加：
- `friedturtleee.me`
- `localhost`

## ✅ 優點

- ✅ 完全免費（Firestore 免費額度充足）
- ✅ 無需 Firebase Storage
- ✅ 無 CORS 問題
- ✅ 支持大文件（最大 15MB）
- ✅ 自動分塊管理

## 📊 Firestore 免費額度

- 1 GB 存儲空間
- 50,000 次/天 讀取
- 20,000 次/天 寫入
- 20,000 次/天 刪除

完成設置後，附件功能將正常工作！

