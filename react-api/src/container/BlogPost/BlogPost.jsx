import React, {Component} from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post";

class BlogPost extends Component{
    state = {
        listArtikel:[]
    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3001/posts')
        .then(response => response.json())
        .then(jsonHasilAmbilDariAPI => {
            this.setState({
                listArtikel: jsonHasilAmbilDariAPI
            })
        })
    }

    componentDidMount(){
        this.ambilDataDariServerAPI()
    }

    handleHapusArtikel = (data) => {
        fetch('http://localhost:3001/posts/$data', {method: 'DELETE'})
        .then(res => {
            this.ambilDataDariServerAPI()
        })
    }

    render(){
        return(
            <div className="post-artikel">
                <h2>Daftar Artikel</h2>
                {
                    this.state.listArtikel.map(artikel => {
                        return <Post key={artikel.id} judul={artikel.title} isi={artikel.body} idArtikel={artikel.id} hapusArtikel={this.handleHapusArtikel}/>
                    })
                }
            </div>
        )
    }
}

export default BlogPost;