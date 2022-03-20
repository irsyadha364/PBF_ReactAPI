import React, {Component} from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post";

class BlogPost extends Component{
    state = {
        listArtikel:[],
        listProfile:[],
        insertArtikel: {
            userId: 1,
            id: 1,
            title: "",
            body: ""
        },
        insertProfile: {
            nim: 1,
            id: 1,
            nama: "",
            alamat: "",
            hp: 1,
            angkatan: 1,
            status: ""
        }
    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3001/profile')
        .then(response => response.json())
        .then(jsonHasilAmbilDariAPI => {
            this.setState({
                listProfile: jsonHasilAmbilDariAPI
            })
        })
    }

    componentDidMount(){
        this.ambilDataDariServerAPI()
    }

    handleHapusProfile = (data) => {
        fetch(`http://localhost:3001/profile/${data}`, {method: 'DELETE'})
        .then(res => {
            this.ambilDataDariServerAPI()
        })
    }

    handleTambahProfile = (event) => {
        let formInsertProfile = {...this.state.insertProfile};
        let timestamp = new Date().getTime();
        formInsertProfile['id'] = timestamp;
        formInsertProfile[event.target.name] = event.target.value;
        // formInsertProfile['id'] = event.target[0].value;
        this.setState({
            insertProfile: formInsertProfile
        });
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3001/profile' , {
            method: 'post' ,
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state.insertProfile)  
        })
            .then( (Response) => {
                this.ambilDataDariServerAPI();
            });
    }

    render(){
        return(
            <div className="post-profile">
                <div className="from pd-2 border-bottom">
                    <div className="from-group row">
                        <label htmlFor="nim" className="col-sm-2 col-form-label">NIM</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="nim" name="nim" onChange={this.handleTambahProfile}/>
                        </div>
                    </div>
                    <div className="from-group row">
                        <label htmlFor="nama" className="col-sm-2 col-form-label">Nama</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="nama" name="nama" rows="1" onChange={this.handleTambahProfile}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="alamat" className="col-sm-2 col-from-label">Alamat</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="alamat" name="alamat" rows="3" onChange={this.handleTambahProfile}></textarea>
                        </div>
                    </div>
                    <div className="from-group row">
                        <label htmlFor="hp" className="col-sm-2 col-form-label">No. HP</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="hp" name="hp" onChange={this.handleTambahProfile}/>
                        </div>
                    </div>
                    <div className="from-group row">
                        <label htmlFor="angkatan" className="col-sm-2 col-form-label">Angkatan</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="angkatan" name="angkatan" onChange={this.handleTambahProfile}/>
                        </div>
                    </div>
                    <div className="from-group row">
                        <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="status" name="status" onChange={this.handleTambahProfile}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2>Daftar Profile</h2>
                {
                    this.state.listProfile.map(profile => {
                        return <Post key={profile.id} id={profile.id} nim={profile.NIM} nama={profile.nama} 
                        alamat={profile.alamat} hp={profile.hp}  angkatan={profile.angkatan} 
                        status={profile.status} hapusProfile={this.handleHapusProfile}/>
                    })
                }
            </div>
        )
    }

    //Data Praktikum
    // ambilDataDariServerAPI = () => {
    //     fetch('http://localhost:3001/posts?_sort=id&_order=desc')
    //     .then(response => response.json())
    //     .then(jsonHasilAmbilDariAPI => {
    //         this.setState({
    //             listArtikel: jsonHasilAmbilDariAPI
    //         })
    //     })
    // }

    // componentDidMount(){
    //     this.ambilDataDariServerAPI()
    // }

    // handleHapusArtikel = (data) => {
    //     fetch(`http://localhost:3001/posts/${data}`, {method: 'DELETE'})
    //     .then(res => {
    //         this.ambilDataDariServerAPI()
    //     })
    // }

    // handleTambahArtikel = (event) => {
    //     let formInsertArtikel = {...this.state.insertArtikel};
    //     let timestamp = new Date().getTime();
    //     formInsertArtikel['id'] = timestamp;
    //     formInsertArtikel[event.target.name] = event.target.value;
    //     this.setState({
    //         insertArtikel: formInsertArtikel
    //     });
    // }

    // handleTombolSimpan = () => {
    //     fetch('http://localhost:3001/posts' , {
    //         method: 'post' ,
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type' : 'application/json'
    //         },
    //         body: JSON.stringify(this.state.insertArtikel)  
    //     })
    //         .then( (Response) => {
    //             this.ambilDataDariServerAPI();
    //         });
    // }

    // render(){
    //     return(
    //         <div className="post-artikel">
    //             <div className="from pd-2 border-bottom">
    //                 <div className="from-group row">
    //                     <label htmlFor="title" className="col-sm-2 col-form-label">Judul</label>
    //                     <div className="col-sm-10">
    //                         <input type="text" className="form-control" id="title" name="title" onChange={this.handleTambahArtikel}/>
    //                     </div>
    //                 </div>
    //                 <div className="form-group row">
    //                     <label htmlFor="body" className="col-sm-2 col-from-label">Isi</label>
    //                     <div className="col-sm-10">
    //                         <textarea className="form-control" id="body" name="body" rows="3" onChange={this.handleTambahArtikel}></textarea>
    //                     </div>
    //                 </div>
    //                 <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
    //             </div>
    //             <h2>Daftar Artikel</h2>
    //             {
    //                 this.state.listArtikel.map(artikel => {
    //                     return <Post key={artikel.id} judul={artikel.title} isi={artikel.body} idArtikel={artikel.id} hapusArtikel={this.handleHapusArtikel}/>
    //                 })
    //             }
    //         </div>
    //     )
    // }
}

export default BlogPost;