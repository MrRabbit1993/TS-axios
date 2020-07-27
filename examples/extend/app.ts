import axios from '../../src/index';

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
});

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
});

axios.get('/extend/get');

axios.options('/extend/options');

axios.delete('/extend/delete');

axios.head('/extend/head');

axios.post('/extend/post', { msg: 'post' });

axios.put('/extend/put', { msg: 'put' });

axios.patch('/extend/patch', { msg: 'patch' });

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
});

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hi'
  }
});

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err));
}

async function test() {
  const user = await getUser<User>();  
  // 这里穿入User 上面调用 T ===>User  ===>axios<ResponseData<User>>('/extend/user')
  // 响应的类型就也应该是<ResponseData<User>>
  // 然后就会有 {
  //   code: number
  // result: User --->name: string,age: number
  // message: string
  // }

  if (user) {
    return user.result.name;
  }
}

test().then(name => {
  console.log(name);
});
