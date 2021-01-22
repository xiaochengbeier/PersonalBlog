/**
 * 判断是否登录
 * @param _that vue 实例对象目的是获得store 中登录状态判断是否登录
 */
export function checkLogin(_that){
    const user = _that.$store.state.login.user;
    if(!user){
        const key = `open${Date.now()}`;
        _that.$notification['error']({
            message: `亲!!`,
            key,
            description:
            '灰常不好似意思啦 您还没有登录',
            placement:"topLeft",
            btn: h => {
            return h(
                'a-button',
                {
                props: {
                    type: 'primary',
                    size: 'small',
                },
                on: {
                    click: () => {
                    _that.$notification.close(key);
                    _that.$router.push("/reglog");
                    },
                },
                },
                '立即登录',
            );
            }
        });
        return false;
    }
    return true;
}