import { useState } from "react";
import {Header} from "../../components/Header.tsx";
import "./index.css"
import {Button, Input, Radio} from "antd";
import radashJson from "./assets/radash.json";
export default function GitHub(){
    const [url, setUrl] = useState("")
    const [token, setToken]= useState("")
    // 是否开启递归
    const [recursive, setRecursive] = useState(false)

    async function handleSubmit(){
        const { owner, repo, path } = parseGitHubUrl(url);
        const flatArray = await fetchRepoContents(owner, repo, path);
        console.log(flatArray)
    }
    async function fetchRepoContents  (owner: string, repo: string, path = '', dir_tree: any[] = []) {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const contents = await response.json();
        for (const item of contents) {
            dir_tree.push({
                ...item,
                children: []
            });
            if(item.type === 'dir') {
                // 如果是目录，可以递归调用来获取子目录的内容
                await fetchRepoContents(owner, repo, item.path,dir_tree);
            }
        }
        return dir_tree;
    }
    function parseGitHubUrl(url: string): { owner: string, repo: string, path: string } {
        // 移除URL末尾的".git"（如果有的话）
        url = url.replace(/\.git$/, "");

        // 解析用户或组织名和仓库名
        const matches = url.match(/github\.com\/([^\/]+)\/([^\/]+)$/);

        if (!matches) {
            throw new Error("Invalid GitHub URL");
        }

        const owner = matches[1];
        const repo = matches[2];
        const path = ''; // 示例中URL不包含具体路径，因此这里设为空字符串

        return { owner, repo, path };
    }

    return (<>
        <div className={"home-container"}>
            <Header/>
            <div className={"home-content"}>
                <div>
                    <label>是否递归获取目录内容：</label>
                    <Radio.Group value={recursive} onChange={(e) => setRecursive(e.target.value)}>
                        <Radio value={true}>递归</Radio>
                        <Radio value={false}>不递归</Radio>
                    </Radio.Group>
                </div>
                <Input placeholder={"Enter GitHub Token"} value={token}
                       onChange={(e) => setToken(e.target.value)}></Input>
                <div className={"question"}>
                    <Input placeholder={"Enter GitHub URL"} value={url}
                           onChange={(e) => setUrl(e.target.value)}></Input>
                    <Button onClick={handleSubmit}>提交</Button>
                </div>
                <div>
                    {
                        radashJson.map((item, index) => {
                            return <div key={index}>
                                <a href={item.download_url!} target={"_blank"}>{JSON.stringify(item.name)}</a>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </>)
}
