import { Alert, View, SectionList, Text } from 'react-native'
import { Feather } from "@expo/vector-icons"
import { theme } from '@/theme'
import { styles } from './styles'
import { Input } from '@/app/components/input'
import { useState, useEffect, useId } from 'react'
import * as Contacts  from 'expo-contacts'
import { Contact, ContactProps } from '@/app/components/contact'

type SectionListDataProps = {
    title: string
    data: ContactProps[]
}

export function Home(){
    const [contacts, setContacts] = useState<SectionListDataProps[]>([])
    const [name, setName] = useState("")

    async function fetchContacts(){
        try{
            const { status } = await Contacts.requestPermissionsAsync()
            if (status === Contacts.PermissionStatus.GRANTED){
                const { data } = await Contacts.getContactsAsync({
                    name,
                    sort: "firstName",
                })
                const list = data.map((contact) => ({
                    id: contact.id ?? useId(),
                    name: contact.name,
                    image: contact.image,
                })).reduce<SectionListDataProps[]>((acc: any, item) => {
                    const firstLetter = item.name[0].toUpperCase()
                    const existingEntry = acc.find((entry: SectionListDataProps) =>
                    (entry.title === firstLetter))

                    if(existingEntry){
                        existingEntry.data.push(item)
                    } else {
                        acc.push({title: firstLetter, data: [item]})
                    }

                    return acc
                }, [])
                setContacts(list)
            }

        } catch(error){
            console.log(error)
            Alert.alert("Contatinhos", "Não foi possível carregar os contatos...")
        }
    }

    useEffect(() => {
        fetchContacts()
    }, [name])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input style={styles.input}>
                    <Feather name="search" size={16}
                    color={theme.colors.gray_300}></Feather>
                    <Input.Field 
                    placeholder="Pesquisar pelo nome..." 
                    onChangeText={setName} value={name}/>
                    <Feather name="x" size={16}
                    color={theme.colors.gray_300} 
                    onPress={() => setName("")}></Feather>
                </Input>
            </View>
            <SectionList 
                sections={[{title: "R", data: [{id: "1", name: "Heloísa"}] }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Contact contact={item}/>
                )}
                renderSectionHeader = {({ section }) => (<Text style={styles.section}>{section.title}</Text>)}
                contentContainerStyle = {styles.contentList}
                showsVerticalScrollIndicator={false}
                SectionSeparatorComponent={() => <View style={styles.separator}/>}
            />
            <Contact contact={{
                name: "Pedroso",
                image: require("@/assets/avatar.jpeg")
            }}/>
        </View>
    )
}