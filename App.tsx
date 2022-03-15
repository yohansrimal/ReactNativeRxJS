/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {Observable} from 'rxjs';
import axios from 'axios';

const App = () => {
  const url = 'https://api.first.org/data/v1/countries';

  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // const observable = ajax.getJSON(url).pipe(
  //   map(response => response),
  //   catchError(error => of(error)),
  // );
  // var observer = {
  //   next: function (value: any) {
  //     console.log(value);
  //   },
  //   error: function (err: any) {
  //     console.log('Is this called?');
  //   },
  //   complete: function () {
  //     console.log('Fetching Complete!');
  //   },
  // };
  // observable.subscribe(observer);

  // let subscription = observable.subscribe({
  //   next: data => console.log('[data] => ', data),
  //   complete: data => console.log('[complete]'),
  // });

  useEffect(() => {
    let observable = new Observable(observer => {
      axios
        .get(url)
        .then(response => {
          observer.next(response.data.data);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });

    var observer = {
      next: function (data: any) {
        setCountries(data);
        // console.log('[data] => ', data);
      },
      error: function (_err: any) {
        setError(_err.message);
        console.log(_err.message);
        setLoading(false);
      },
      complete: function () {
        console.log('Fetching Complete!');
        setLoading(false);
        setError(null);
      },
    };

    let subscription = observable.subscribe(observer);

    return () => subscription.unsubscribe();
  }, []);

  function Countries() {
    return Object.values(countries).map(function (news: any, i) {
      return (
        <View key={i}>
          <Text>{news.country}</Text>
        </View>
      );
    });
  }

  return (
    <ScrollView style={{flex: 1, height: '100%'}}>
      <View style={{flex: 1, height: '100%'}}>
        {loading == true ? (
          <View
            style={{
              backgroundColor: '#FFFFFF',
              height: 100,
              width: 100,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            {error == null ? null : <Text style={{color: 'red'}}>{error}</Text>}
            {Countries()}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default App;
